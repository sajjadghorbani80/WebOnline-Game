/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
interface ReqTopPlayersDto {
  count:number
}
interface userInfoDto {
  uid: number;
  userName: string;
  fullName: string;
  sumScore: number;
  PlayCount: number;
}

interface getUserDto {
  uid: number;
  fullname: string;
  username: string;
}
export {ReqTopPlayersDto,userInfoDto,getUserDto};
