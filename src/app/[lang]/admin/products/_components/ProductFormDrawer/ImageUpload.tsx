"use client";

import { IFile } from "@/app/_temp/temp-interfaces";
import {
  ActionIcon,
  Box,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { IconPhoto, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  value?: (IFile & { thumbnailUrl?: string })[];
  onChange: (files: (IFile & { thumbnailUrl?: string })[]) => void;
  maxFiles?: number;
}

export default function ImageUpload({
  value = [],
  onChange,
  maxFiles = 5,
}: ImageUploadProps) {
  const [files, setFiles] =
    useState<(IFile & { thumbnailUrl?: string })[]>(value);

  useEffect(() => {
    setFiles(value);
  }, [value]);

  const handleDrop = (droppedFiles: FileWithPath[]) => {
    if (files.length + droppedFiles.length > maxFiles) {
      // Show error or truncate the files
      alert(`You can only upload a maximum of ${maxFiles} images.`);
      return;
    }

    const newFiles = droppedFiles.map((file) => {
      const newFile: IFile & { thumbnailUrl?: string } = {
        name: file.name,
        percent: 100,
        size: file.size,
        status: "success",
        type: file.type,
        uid: Math.random().toString(36).substring(2, 11),
        url: URL.createObjectURL(file),
        thumbnailUrl: URL.createObjectURL(file),
      };

      return newFile;
    });

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <Stack>
      <Dropzone
        onDrop={handleDrop}
        accept={["image/png", "image/jpeg", "image/gif", "image/webp"]}
        maxFiles={maxFiles - files.length}
        disabled={files.length >= maxFiles}
      >
        <Group
          justify="center"
          gap="xl"
          mih={100}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload size={50} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={50} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} stroke={1.5} />
          </Dropzone.Idle>

          <Box>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach up to {maxFiles} images, each file should not exceed 5mb
            </Text>
          </Box>
        </Group>
      </Dropzone>

      {files.length > 0 && (
        <Box>
          <Text fw={500} mb="xs">
            Uploaded images:
          </Text>
          <Group gap="sm">
            {files.map((file, index) => (
              <Paper key={file.uid} p="xs" withBorder>
                <Stack gap="xs">
                  <Box pos="relative">
                    <Image
                      src={file.thumbnailUrl || file.url}
                      height={100}
                      width={100}
                      radius="sm"
                      fit="cover"
                    />
                    <ActionIcon
                      color="red"
                      variant="filled"
                      radius="xl"
                      size="sm"
                      style={{ position: "absolute", top: -8, right: -8 }}
                      onClick={() => removeFile(index)}
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Box>
                  <Text size="xs" lineClamp={1} style={{ maxWidth: 100 }}>
                    {file.name}
                  </Text>
                </Stack>
              </Paper>
            ))}
          </Group>
        </Box>
      )}
    </Stack>
  );
}
