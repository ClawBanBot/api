export interface IConfig {
  enable_allow_list: boolean;
  allow_list?: string[];
  admins: string[];
}

//TODO: store in DB
const config = {
  enable_allow_list: true,
  allow_list: ["MadhouseSteve", "whitep4nth3r"],
  admins: ["MadhouseSteve", "whitep4nth3r"],
};

if (config.allow_list) {
  config.allow_list = config.allow_list.map((m) => m.toLowerCase());
}
config.admins = config.admins.map((m) => m.toLowerCase());

export default config;
