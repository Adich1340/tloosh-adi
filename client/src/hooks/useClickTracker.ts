import { RefObject, useEffect } from "react";
import { trackerService } from "../services/trackerService";

interface ClickTrackerProps {
  ref: RefObject<HTMLElement>;
  userId: number;
}

export const useClickTracker = ({ ref, userId }: ClickTrackerProps) => {
  useEffect(() => {
    const handleClick = async (e: any) => {
      console.log(" adi 222 ", e?.srcElement?.ariaLabel);
      if (e?.srcElement?.ariaLabel) {
        const res = await trackerService.trackAction(
          userId,
          e.srcElement.ariaLabel
        );
      }
    };

    if (ref.current) {
      ref.current.addEventListener("click", handleClick);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("click", handleClick);
      }
    };
  }, [ref, userId]);
};
