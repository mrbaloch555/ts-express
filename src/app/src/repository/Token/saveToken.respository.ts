import { Token } from "../../../../database/models";
import {
  TokenDoc,
  TokenTypes,
} from "../../../../database/models/interfaces/token.interface";
const saveToken = async ({
  token,
  user,
  expires,
  type,
}: {
  token: string;
  user: string;
  expires: string;
  type: TokenTypes;
}): Promise<TokenDoc> => {
  const tokenDoc = await Token.build({
    token,
    user,
    expires,
    type,
  });

  await tokenDoc.save();
  return tokenDoc;
};

export { saveToken };
