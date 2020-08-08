import React, { useState, useEffect } from "react";
import "./style.sass";
import { Avatar } from "antd";
import { useRootContext } from "../../hoc/RootContext";
import { checkDimension } from "../../components/UploadImage/functionUploadImage";

export default function ProfileMain() {
  const { authProfile } = useRootContext();
  const photoUrl = authProfile.photoUrl
  const [landscape, setLandscape] = useState(false);
  const [portrait, setPortrait] = useState(false);

  useEffect(() => {
    getCustomer();
  }, [photoUrl]);

  async function getCustomer() {
    if (photoUrl) {
      const isDimention = await checkDimension(photoUrl);
      if (isDimention.height > isDimention.width) {
        setPortrait(true);
        setLandscape(false);
      }
      if (isDimention.height < isDimention.width) {
        setPortrait(false);
        setLandscape(true);
      }
    }
  }

  return (
    <div>
      <div className="profile-main">
        <div className={portrait ? "portrait" : landscape ? "landscape" : ""}>
          <Avatar
            icon={photoUrl || "user"}
            size={40}
            src={photoUrl}
          />
        </div>
        <div className="profile-main__customer-name">
          <span>{authProfile.name}</span>
        </div>
      </div>
    </div>
  );
}
