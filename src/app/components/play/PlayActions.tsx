"use client";

import { FaBackwardStep, FaForwardStep, FaPause, FaPlay } from "react-icons/fa6";
import { useEffect } from "react";

export default function PlayActions() {
  useEffect(() => {
    const elementPlayAudio = document.querySelector(".play-audio");
    if (elementPlayAudio) {
      const elementAudio = elementPlayAudio.querySelector(".inner-audio");
      if (elementAudio) {
        const handleEnded = () => {
          handleNextPrev("next");
        };

        elementAudio.addEventListener("ended", handleEnded);

        return () => {
          elementAudio.removeEventListener("ended", handleEnded);
        };
      }
    }
  }, []);

  const handlePlay = (event: any) => {
    const elementPlayAudio: any = document.querySelector(".play-audio");
    if (elementPlayAudio) {
      const elementAudio = elementPlayAudio.querySelector(".inner-audio");
      const boxButtonPlay = elementPlayAudio.querySelector(".box-button-play");

      if (elementAudio && boxButtonPlay) {
        if(boxButtonPlay.classList.contains("play")) {
          boxButtonPlay.classList.remove("play");
          elementAudio.pause();
        } else {
          boxButtonPlay.classList.add("play");
          elementAudio.play();
        }
      }
    }
  }

  const handleNextPrev = (action: string) => {
    console.log(action);

    const elementPlayAudio: any = document.querySelector(".play-audio");
    if (elementPlayAudio) {
      const idSongCurrent = elementPlayAudio.getAttribute("song-id");
      const elementSongCurrent = document.querySelector(`[song-list] [song-id='${idSongCurrent}']`);
      
      if (elementSongCurrent) {
        switch (action) {
          case "next":
            const elementSongNext = elementSongCurrent.nextElementSibling;
            if (elementSongNext) {
              const buttonPlay: any = elementSongNext.querySelector("button[button-play]");
              if (buttonPlay) {
                buttonPlay.click();
              }
            }
            break;
          case "prev":
            const elementSongPrev = elementSongCurrent.previousElementSibling;
            if (elementSongPrev) {
              const buttonPlay: any = elementSongPrev.querySelector("button[button-play]");
              if (buttonPlay) {
                buttonPlay.click();
              }
            }
            break;
        }
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button 
          className="text-white text-[16px]"
          onClick={() => handleNextPrev("prev")}
        >
          <FaBackwardStep />
        </button>
        <button 
          className="text-white text-[16px] w-[32px] h-[32px] bg-primary rounded-full mx-[42px] inline-flex items-center justify-center box-button-play"
          onClick={handlePlay}
        >
          <FaPlay className="inner-icon-play" />
          <FaPause className="inner-icon-pause" />
        </button>
        <button 
          className="text-white text-[16px]"
          onClick={() => handleNextPrev("next")}
        >
          <FaForwardStep />
        </button>
      </div>
    </>
  )
}
