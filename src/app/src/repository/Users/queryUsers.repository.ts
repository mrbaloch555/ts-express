import { User } from "../../../../database/models";
import {
  Options,
  PaginationResult,
} from "../../../../database/models/interfaces/paginates.interface";
import {
  UserAttrs,
  UserDoc,
} from "../../../../database/models/interfaces/user.interface";

/**
 *
 * @param userBody
 * @returns {Promise<UserDoc>}
 */
const queryUsers = async (
  filter: object,
  options: Options
): Promise<PaginationResult> => {
  const results = await User.paginate(filter, options);
  return results;
};

export { queryUsers };
