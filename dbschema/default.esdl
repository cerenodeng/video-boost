module default {
  type User {
    required email: str;
    first_name: str;
    last_name: str;
    setting: Setting {
      constraint exclusive;
    }
  }

  type Setting {
    narrow_sidebar: bool;
  }
}
