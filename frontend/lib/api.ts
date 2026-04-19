import { Surah, ApiResponse, SearchResult } from "@/types";

// fetch all surah
export const fetchSurahList = async (): Promise<ApiResponse<Surah[]>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/surah`,
      {
        method: "GET",
        next: { revalidate: 86400 } // 1 day refresh
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch surah list");
    }

    const data: ApiResponse<Surah[]> = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching surah list:", error);

    return {
      status: false,
      message: "Error fetching surah list",
      data: [],
    };
  }
};


// fetch single surah
export const fetchSurahById = async (
  id: number
): Promise<ApiResponse<Surah | null>> => {
  try {
    if (!id || Number.isNaN(id)) {
      throw new Error("Invalid Surah ID");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/surah/${id}`,
      {
        method: "GET",
        next: { revalidate: 86400 } // 1 day
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch surah: ${res.status}`);
    }

    const data = (await res.json()) as ApiResponse<Surah>;

    return data;
  } catch (error) {
    console.error("Error fetching surah:", error);

    return {
      status: false,
      message: "Error fetching surah",
      data: null,
    };
  }
};


// search ayahs by text (in translation)
export const searchAyahs = async (
  query: string,
): Promise<ApiResponse<SearchResult[]>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search?q=${query}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    console.log("Search query:", query, "Response status:", res.status);

    if (!res.ok) {
      throw new Error("Failed to search ayahs");
    }

    const data: ApiResponse<SearchResult[]> = await res.json();

    return data;
  } catch (error) {
    console.error("Search error:", error);

    return {
      status: false,
      message: "Error searching ayahs",
      data: [],
    };
  }
};