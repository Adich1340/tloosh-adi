import React, { MutableRefObject, useRef } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useClickTracker } from "../../hooks/useClickTracker";

interface ctaButtonInterface {
  userId: number;
}

export const CtaButton: React.FC<ctaButtonInterface> = ({ userId }) => {
  const ctaButtonRef = useRef<MutableRefObject<HTMLElement> | null | any>(null);

  const userActionsTracker = useClickTracker({
    ref: ctaButtonRef,
    userId: userId,
  });

  return (
    <StyledButton
      aria-label="cta-button"
      ref={ctaButtonRef}
      variant="contained"
      onClick={(e) => {
        e.stopPropagation();
        alert("CTA Button Clicked!");
      }}
    >
      Call to Action
    </StyledButton>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#38a169",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  fontWeight: "bold",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#2c7a4b",
  },
}));
