import { apiPost } from "../utils/apiUtils";

export function saveTabLS(tab: number, userWidgets: any[], userLayout: any[]) {
  window?.localStorage.setItem(`userLayout${tab}`, JSON.stringify(userLayout));
  window?.localStorage.setItem(
    `userWidgets${tab}`,
    JSON.stringify(userWidgets)
  );
}

export async function saveTabDB(
  tab: number,
  userWidgets: any[],
  userLayout: any[]
) {
  const { error } = await apiPost("/api/user/settings", {
    payload: {
      tab: 0,
      userWidgets,
      userLayout,
    },
  });
  if (error) {
    // TBD
  }
}
