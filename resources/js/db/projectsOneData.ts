export interface ProjectDataType {
  id: number;
  image: string;
  title: string;
  description: string;
  text1: string;
  text2: string;
  text3: string;
}

export async function getdata(): Promise<ProjectDataType[]> {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/researchsurveys",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result?.message || "Failed to fetch research surveys");
        }

        if (!result?.data) {
            throw new Error("Invalid response format");
        }

        return result.data as ProjectDataType[];

    } catch (error: any) {
        console.error("Fetch error:", error);
        throw new Error(error.message || "Server connection error");
    }
}
