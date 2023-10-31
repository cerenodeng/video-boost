CREATE MIGRATION m1eode5ww3lma2mdl2boh6mlw7r3uecpyqc5t7fnkzlftx6kb7kjia
    ONTO initial
{
  CREATE TYPE default::Setting {
      CREATE PROPERTY narrow_sidebar: std::bool;
  };
  CREATE TYPE default::User {
      CREATE LINK setting: default::Setting {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE PROPERTY first_name: std::str;
      CREATE PROPERTY last_name: std::str;
  };
};
