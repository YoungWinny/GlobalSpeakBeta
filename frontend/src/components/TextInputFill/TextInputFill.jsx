/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const TextInputFill = ({ className }) => {
  return (
    <div
      className={`relative w-[448px] h-16 bg-[#ffffff99] rounded-[10px] border-[0.5px] border-solid border-[#bebebe] ${className}`}
    >
      <div className="absolute w-[231px] h-[46px] top-[9px] left-[75px]">
        <div className="absolute w-[85px] top-0 left-0 [font-family:'Nunito_Sans',Helvetica] font-normal text-[#636363] text-xs tracking-[0] leading-[normal]">
          Email address
        </div>
        <div className="absolute w-[227px] top-6 left-0 [font-family:'Nunito_Sans',Helvetica] font-black text-[#000000] text-base tracking-[0] leading-[normal]">
          Lebron_james@gmail.com
        </div>
      </div>
      <img
        className="absolute w-[30px] h-[30px] top-[17px] left-[396px]"
        alt="Cancel svgrepo com"
        src="/img/cancel-svgrepo-com-1.svg"
      />
      <img className="absolute w-px h-[46px] top-2.5 left-[60px]" alt="Line" src="/img/line-3-1.svg" />
      <img
        className="absolute w-[41px] h-[41px] top-[11px] left-[11px]"
        alt="Mail svgrepo com"
        src="/img/mail-svgrepo-com-1.svg"
      />
    </div>
  );
};
