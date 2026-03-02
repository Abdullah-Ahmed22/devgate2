// export const apiFetch = async (
//   url: string,
//   options: RequestInit = {}
// ) => {
//   const token = localStorage.getItem("token");

//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     ...(token && { Authorization: `Bearer ${token}` }),
//     ...options.headers,
//   };

//   const response = await fetch(url, {
//     ...options,
//     headers,
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Request failed");
//   }

//   return data;
// };
