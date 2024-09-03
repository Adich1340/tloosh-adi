import { RefObject, useEffect } from "react";
import { trackerService } from "../services/trackerService";

interface ClickTrackerProps {
  ref: RefObject<HTMLElement>;
  userId: number;
}

export const useClickTracker = ({ ref, userId }: ClickTrackerProps) => {
  useEffect(() => {
    const handleClick = async (e: MouseEvent) => {
      // Cast e.target to HTMLElement to access ariaLabel
      const target = e.target as HTMLElement;
      if (target?.ariaLabel) {
        const res = await trackerService.trackAction(userId, target.ariaLabel);
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
