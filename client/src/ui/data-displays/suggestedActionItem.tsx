import { animated, config, useSpring } from "@react-spring/web";
import { FC, MutableRefObject, RefObject, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { CtaButton } from "../buttons/cta-button";
import { MoreOptionsDropdownMenu } from "../menus/moreOptionsDropdownMenu";
// import { Action } from "../../../types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useClickTracker } from "../../hooks/useClickTracker";

interface SuggestedActionItemProps {
  action: any; //Action
  isExpanded: boolean;
  handleClick: (id: number) => void;
  menuOptions: any;
  userId: number;
}

export const SuggestedActionItem: FC<SuggestedActionItemProps> = ({
  action,
  isExpanded,
  handleClick,
  menuOptions,
  userId,
}) => {
  const optionsRef = useRef<RefObject<HTMLElement> | null | any>(null);
  const [showMoreOptionsMenu, setShowMoreOptionsMenu] =
    useState<boolean>(false);

  const springProps = useSpring({
    scale: isExpanded ? 1.05 : 1,
    config: config.wobbly,
  });

  const contentSyle = useSpring({
    maxHeight: isExpanded ? 1000 : 0,
    opacity: isExpanded ? 1 : 0,
    config: { tension: 300, friction: 30 },
  });

  const userActionsTracker = useClickTracker({
    ref: optionsRef,
    userId: userId,
  });

  return (
    <ActionCard
      key={action.id}
      onClick={() => handleClick(action.id)}
      $isHighlighted={isExpanded}
      style={springProps}
    >
      <ActionHeader>
        <ActionTitle>{action.title}</ActionTitle>
        <ActionName>
          {action.name}
          <IconButton aria-label="more-options-button" ref={optionsRef}>
            <MoreVertIcon
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreOptionsMenu(true);
              }}
            />
            <MoreOptionsDropdownMenu
              anchorEl={optionsRef.current}
              menuOptions={menuOptions}
              open={showMoreOptionsMenu}
              onClose={() => setShowMoreOptionsMenu(false)}
            />
          </IconButton>
        </ActionName>
      </ActionHeader>
      <ActionContent style={contentSyle}>
        <ActionDescription>{action.description}</ActionDescription>
        <ActionButton>
          <CtaButton userId={userId} />
        </ActionButton>
      </ActionContent>
    </ActionCard>
  );
};

const ActionCard = styled(animated.div)<{ $isHighlighted: boolean }>`
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: ${({ $isHighlighted }) => ($isHighlighted ? 3 : 2)};

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      box-shadow: 0 0 20px rgba(56, 161, 105, 0.8);
    `}
`;

const ActionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 20px 20px;
  font-weight: bold;
`;

const ActionTitle = styled.span`
  font-size: 18px;
  color: #2d3748;
`;

const ActionName = styled.span`
  font-size: 18px;
  color: #38a169;
`;

const ActionContent = styled(animated.div)`
  padding: 10px;
  background-color: #f7fafc;
  display: flex;
  flex-direction: column;
`;

const ActionDescription = styled.p`
  color: #4a5568;
  margin-bottom: 20px;
`;

const ActionButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
`;
