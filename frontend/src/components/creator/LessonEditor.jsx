import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiMaximize2, FiMinimize2, FiEdit2, FiType, FiPlus, FiVideo, FiImage, FiMic, FiSave, FiEye, FiEyeOff, FiX, FiUpload } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { axiosInstance } from '../../utils/axiosInstance';

export default function LessonEditor({ courseData }) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [viewMode, setViewMode] = useState('edit');
  const [isAIAssistOpen, setIsAIAssistOpen] = useState(false);
  const [aiAction, setAiAction] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  useEffect(() => {
    fetchLessons();
  }, [courseData._id]);

  const fetchLessons = async () => {
    try {
      const response = await axiosInstance.get(`/api/content/course/${courseData._id}`);
      const courseLessons = response.data.filter(item => item.type === 'lesson');
      setLessons(courseLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  // Handle file selection
  const handleFileSelect = async (event, fileType) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;

    setUploadingMedia(true);
    
    try {
      for (const file of files) {
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
          Swal.fire({
            icon: 'error',
            title: 'File too large',
            text: `${file.name} exceeds 10MB limit`
          });
          continue;
        }

        // Validate file type
        const validTypes = {
          image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          video: ['video/mp4', 'video/webm', 'video/ogg'],
          audio: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4']
        };

        if (!validTypes[fileType].includes(file.type)) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid file type',
            text: `${file.name} is not a valid ${fileType} file`
          });
          continue;
        }

        // Create FormData for upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', fileType);
        formData.append('courseId', courseData._id);

        // Upload file
        const uploadResponse = await axiosInstance.post('/api/upload/media', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (uploadResponse.data.success) {
          // Add to mediaFiles state
          setMediaFiles(prev => [...prev, {
            id: Date.now() + Math.random(),
            type: fileType,
            url: uploadResponse.data.fileUrl,
            filename: file.name,
            caption: ''
          }]);
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      Swal.fire({
        icon: 'error',
        title: 'Upload failed',
        text: error.response?.data?.message || 'Failed to upload file'
      });
    } finally {
      setUploadingMedia(false);
      // Clear file input
      event.target.value = '';
    }
  };

  // Update media caption
  const updateMediaCaption = (mediaId, caption) => {
    setMediaFiles(prev => prev.map(media => 
      media.id === mediaId ? { ...media, caption } : media
    ));
  };

  // Remove media file
  const removeMediaFile = (mediaId) => {
    setMediaFiles(prev => prev.filter(media => media.id !== mediaId));
  };

  const handleAIAction = async (action) => {
    if (!content) {
      Swal.fire({
        icon: 'warning',
        title: 'No content',
        text: 'Please add some content first'
      });
      return;
    }
    
    setAiAction(action);
    try {
      const response = await axiosInstance.post('/api/content/ai/modify-text', {
        text: content,
        action: action
      });
      
      if (response.data.success) {
        setContent(response.data.modifiedText);
        Swal.fire({
          icon: 'success',
          title: 'Content enhanced!',
          text: `AI has successfully ${action}ed your content`,
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        throw new Error(response.data.message || 'Failed to modify text');
      }
    } catch (error) {
      console.error(`AI ${action} failed:`, error);
      Swal.fire({
        icon: 'error',
        title: `AI ${action} failed`,
        text: error.response?.data?.message || error.message
      });
    } finally {
      setAiAction(null);
    }
  };

  const handleSaveLesson = async () => {
    if (!title.trim() || !content.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'Please provide a title and content for the lesson'
      });
      return;
    }

    setIsSaving(true);
    try {
      const lessonData = {
        course: courseData._id,
        title,
        type: 'lesson',
        content,
        order: lessons.length + 1,
        objectives: [],
        isPublished: false,
        media: mediaFiles.map(media => ({
          type: media.type,
          url: media.url,
          caption: media.caption
        }))
      };

      const response = await axiosInstance.post('/api/content', lessonData);
      
      Swal.fire({
        icon: 'success',
        title: 'Lesson saved!',
        text: 'Your lesson has been saved successfully',
        timer: 2000,
        showConfirmButton: false
      });
      
      // Reset form and refresh list
      setTitle('');
      setContent('');
      setMediaFiles([]);
      fetchLessons();
    } catch (error) {
      console.error('Failed to save lesson:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to save lesson',
        text: error.response?.data?.message || error.message
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishLesson = async (lessonId) => {
    try {
      await axiosInstance.patch(`/api/content/${lessonId}/publish`);
      Swal.fire('Published!', 'Lesson is now published.', 'success');
      fetchLessons();
    } catch (error) {
      console.error('Failed to publish lesson:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to publish lesson',
        text: error.response?.data?.message || error.message
      });
    }
  };

  const handleUnpublishLesson = async (lessonId) => {
    try {
      await axiosInstance.patch(`/api/content/${lessonId}/unpublish`);
      Swal.fire('Unpublished!', 'Lesson is now a draft.', 'success');
      fetchLessons();
    } catch (error) {
      console.error('Failed to unpublish lesson:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to unpublish lesson',
        text: error.response?.data?.message || error.message
      });
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/api/content/${lessonId}`);
        Swal.fire('Deleted!', 'Lesson has been deleted.', 'success');
        fetchLessons();
      } catch (error) {
        console.error('Failed to delete lesson:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete lesson',
          text: error.response?.data?.message || error.message
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Lessons */}
      {lessons.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Existing Lessons ({lessons.length})</h3>
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <div key={lesson._id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{lesson.title}</h4>
                  <p className="text-sm text-gray-600">
                    Order: {lesson.order} • {lesson.isPublished ? 'Published' : 'Draft'}
                    {lesson.media && lesson.media.length > 0 && ` • ${lesson.media.length} media files`}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {lesson.isPublished ? (
                    <button
                      onClick={() => handleUnpublishLesson(lesson._id)}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm flex items-center"
                    >
                      <FiEyeOff className="mr-1" /> Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePublishLesson(lesson._id)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm flex items-center"
                    >
                      <FiEye className="mr-1" /> Publish
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteLesson(lesson._id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lesson Editor Form */}
      <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-[#C35029]">Create New Lesson</h2>
            <p className="text-gray-500 text-sm mt-1">For: {courseData.title}</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1 transition-colors"
            >
              {viewMode === 'edit' ? (
                <>
                  <FiMaximize2 size={16} /> Preview
                </>
              ) : (
                <>
                  <FiEdit2 size={16} /> Edit
                </>
              )}
            </button>
            <button
              onClick={() => setIsAIAssistOpen(!isAIAssistOpen)}
              className="px-3 py-1.5 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg flex items-center gap-1 transition-colors"
            >
              <FiPlus size={16} /> AI Assist
            </button>
          </div>
        </div>
        
        {isAIAssistOpen && (
          <div className="p-4 border-b border-[#ef9273] bg-[#f8e1d8]">
            <h3 className="font-medium text-[#C35029] mb-2">AI Assistance</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAIAction('expand')}
                disabled={aiAction === 'expand'}
                className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-1"
              >
                {aiAction === 'expand' ? '⏳' : <FiType size={14} />}
                {aiAction === 'expand' ? 'Expanding...' : 'Expand'}
              </button>
              <button
                onClick={() => handleAIAction('simplify')}
                disabled={aiAction === 'simplify'}
                className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50"
              >
                {aiAction === 'simplify' ? '⏳' : 'Simplify'}
              </button>
              <button
                onClick={() => handleAIAction('examples')}
                disabled={aiAction === 'examples'}
                className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50"
              >
                {aiAction === 'examples' ? '⏳' : 'Add Examples'}
              </button>
            </div>
          </div>
        )}
        
        <div className="p-4 border-b border-gray-200">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
              placeholder="Enter lesson title..."
            />
          </div>

          {/* Media Upload Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Media Files</label>
            <div className="flex flex-wrap gap-3">
              {/* Image Upload */}
              <label className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                <FiImage className="mr-2" />
                Add Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, 'image')}
                  disabled={uploadingMedia}
                />
              </label>

              {/* Video Upload */}
              <label className="flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
                <FiVideo className="mr-2" />
                Add Video
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, 'video')}
                  disabled={uploadingMedia}
                />
              </label>

              {/* Audio Upload */}
              <label className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                <FiMic className="mr-2" />
                Add Audio
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, 'audio')}
                  disabled={uploadingMedia}
                />
              </label>
            </div>
            
            {uploadingMedia && (
              <div className="mt-2 text-sm text-gray-600 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#C35029] mr-2"></div>
                Uploading media files...
              </div>
            )}
          </div>

          {/* Media Files Preview */}
          {mediaFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Media Files ({mediaFiles.length})</h4>
              <div className="space-y-3">
                {mediaFiles.map((media) => (
                  <div key={media.id} className="flex items-start space-x-3 p-3 border rounded-lg bg-gray-50">
                    <div className="flex-shrink-0">
                      {media.type === 'image' && (
                        <img 
                          src={media.url} 
                          alt={media.caption || 'Media preview'} 
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      {media.type === 'video' && (
                        <div className="w-16 h-16 bg-purple-100 rounded flex items-center justify-center">
                          <FiVideo className="text-purple-600" size={24} />
                        </div>
                      )}
                      {media.type === 'audio' && (
                        <div className="w-16 h-16 bg-green-100 rounded flex items-center justify-center">
                          <FiMic className="text-green-600" size={24} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{media.filename}</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            media.type === 'image' ? 'bg-blue-100 text-blue-800' :
                            media.type === 'video' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {media.type}
                          </span>
                        </div>
                        <button
                          onClick={() => removeMediaFile(media.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                      
                      <input
                        type="text"
                        value={media.caption}
                        onChange={(e) => updateMediaCaption(media.id, e.target.value)}
                        placeholder="Add a caption (optional)"
                        className="w-full mt-2 p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#C35029] focus:border-[#C35029]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4">
          {viewMode === 'edit' ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-96 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029] font-mono text-gray-700"
              placeholder="Write your lesson content in Markdown..."
            />
          ) : (
            <div className="prose max-w-none p-4 border border-gray-200 rounded-lg">
              <ReactMarkdown>{content || '*Nothing to preview yet*'}</ReactMarkdown>
              
              {/* Show media files in preview */}
              {mediaFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Media Files</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mediaFiles.map((media) => (
                      <div key={media.id} className="border rounded-lg overflow-hidden">
                        {media.type === 'image' && (
                          <div>
                            <img 
                              src={media.url} 
                              alt={media.caption || 'Lesson media'} 
                              className="w-full h-48 object-cover"
                            />
                            {media.caption && (
                              <div className="p-3 text-sm text-gray-600">
                                {media.caption}
                              </div>
                            )}
                          </div>
                        )}
                        {media.type === 'video' && (
                          <div>
                            <video 
                              controls 
                              className="w-full h-48 object-cover"
                              poster="/video-thumbnail-placeholder.png"
                            >
                              <source src={media.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            {media.caption && (
                              <div className="p-3 text-sm text-gray-600">
                                {media.caption}
                              </div>
                            )}
                          </div>
                        )}
                        {media.type === 'audio' && (
                          <div className="p-4">
                            <div className="flex items-center">
                              <audio controls className="w-full">
                                <source src={media.url} type="audio/mpeg" />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                            {media.caption && (
                              <div className="mt-2 text-sm text-gray-600">
                                {media.caption}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
          <button 
            onClick={handleSaveLesson}
            disabled={isSaving || !title.trim() || !content.trim()}
            className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="mr-2" /> Save Lesson
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}