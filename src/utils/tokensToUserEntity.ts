import { UserEntity } from "@/core/entities/UserEntity";
import { DecodedIdToken } from "firebase-admin/auth";

const tokensToUserEntity = (decodedToken: DecodedIdToken): UserEntity => {
  const { uid, email, picture, name } = decodedToken;

  return {
    id: uid,
    email: email!,
    displayName: name,
    photoURL: picture,
  };
};

export default tokensToUserEntity;
