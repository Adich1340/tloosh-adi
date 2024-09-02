import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { offersService } from "../services/offersService";
import { SuggestedActionItem } from "../ui/data-displays/suggestedActionItem";

type offerType = {
  id: number;
  name: string;
  price: string;
  description: string;
  timestamp: Date;
  affiliant: affiliantType;
};

type affiliantType = {
  id: number;
  name: string;
  link: string;
};

export const SuggestedActionsSection: React.FC = () => {
  const [user, setUser] = useState<number>(Math.ceil(Math.random() * 4));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offers, setOffers] = useState<offerType[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchOffers(user);
  }, [user]);

  const fetchOffers = async (user: number) => {
    const res = await offersService.getAllOffers(user);
    setOffers(res);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const hideAffiliant = async (userId: number, affiliantId: number) => {
    await offersService.hideAffiliant(userId, affiliantId);
    const res = await offersService.getAllOffers(userId);
    setOffers(res);
  };

  const hideOffer = async (userId: number, offerId: number) => {
    await offersService.hideOffer(userId, offerId);
    const res = await offersService.getAllOffers(userId);
    setOffers(res);
  };

  const handleItemClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SuggestedActions>
      <>
        {Object.keys(offers).map((offerKey: any, idx: number) => {
          let offerItem = offers[offerKey];
          let affiliantItem = offerItem.affiliant;
          let isExpanded = expandedId === offerItem.id;

          return (
            <SuggestedActionItem
              userId={user}
              key={`${offerItem}-${affiliantItem}-${idx}`}
              handleClick={handleItemClick}
              action={{
                id: offerItem.id,
                title: offerItem.name,
                name: affiliantItem.name,
                description: offerItem.description,
              }}
              isExpanded={isExpanded}
              menuOptions={[
                {
                  leftItem: <VisibilityOffIcon />,
                  title: "Hide offer",
                  click: () => {
                    hideOffer(user, offerItem.id);
                    setExpandedId(null);
                  },
                },
                {
                  leftItem: <VisibilityOffIcon />,
                  title: "Hide affiliant",
                  click: () => {
                    hideAffiliant(user, affiliantItem.id);
                    setExpandedId(null);
                  },
                },
              ]}
            />
          );
        })}
      </>
    </SuggestedActions>
  );
};

const SuggestedActions = styled.div`
  width: 100%;
  height: 100%;
  max-width: 700px;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;
