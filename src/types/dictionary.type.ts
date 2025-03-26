import getDictionary from "@/utils/getDictionary";

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
