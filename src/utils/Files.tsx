import { FileProps } from "../props/global_props/FileProps";

export const selectFilesByExtension = async (
    extensions: string[]
): Promise<FileProps[]> => {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;

        input.accept = extensions
            .map((ext) => (ext.startsWith(".") ? ext : `.${ext}`))
            .join(",");

        input.onchange = () => {
            const files = Array.from(input.files ?? []);
            const filePropsList: FileProps[] = files.map((file) => ({
                fileName: file.name,
                file: file,
            }));

            resolve(filePropsList);
        };

        input.click();
    });
};
