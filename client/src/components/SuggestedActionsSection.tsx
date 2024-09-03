import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { offerType, offersService } from "../services/offersService";
import { SuggestedActionItem } from "../ui/data-displays/suggestedActionItem";

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
    try {
      const res = await offersService.getAllOffers(user);
      if (!res) {
        throw new Error("Error: could not get all offers");
      }
      setOffers(res);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const hideAffiliant = async (userId: number, affiliantId: number) => {
    try {
      await offersService.hideAffiliant(userId, affiliantId);
      const res = await offersService.getAllOffers(userId);
      if (!res) {
        throw new Error("Error: could not hide this offer");
      }
      setOffers(res);
    } catch (e) {
      console.error(e);
    }
  };

  const hideOffer = async (userId: number, offerId: number) => {
    try {
      await offersService.hideOffer(userId, offerId);
      const res = await offersService.getAllOffers(userId);
      if (!res) {
        throw new Error("Error: could not hide this affiliant");
      }
      setOffers(res);
    } catch (e) {
      console.error(e);
    }
  };

  const handleItemClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SuggestedActions>
      <>
        {offers.map((offerItem: offerType, idx: number) => {
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
