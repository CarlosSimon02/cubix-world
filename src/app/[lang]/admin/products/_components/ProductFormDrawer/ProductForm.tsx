"use client";

import { mockData } from "@/app/_temp/temp-data";
import {
  Box,
  Button,
  Combobox,
  Group,
  InputBase,
  NumberInput,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Textarea,
  useCombobox,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { z } from "zod";
import useProductDrawerStore from "../../_stores/useProductDrawerStore";
import ImageUpload from "./ImageUpload";

// Define Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  category: z.object({
    id: z.string().min(1, "Category is required"),
    title: z.string(),
  }),
  isActive: z.boolean(),
  images: z
    .array(
      z.object({
        name: z.string(),
        percent: z.number(),
        size: z.number(),
        status: z.enum(["error", "success", "done", "uploading", "removed"]),
        type: z.string(),
        uid: z.string(),
        url: z.string(),
        thumbnailUrl: z.string().optional(),
      })
    )
    .min(1, "At least one image is required"),
});

export type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  onSubmit: (values: ProductFormValues) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const { editProduct, setHasUnsavedChanges } = useProductDrawerStore();
  const [loading, { open: startLoading, close: stopLoading }] =
    useDisclosure(false);

  // Initialize form with default values or edit values
  const form = useForm<ProductFormValues>({
    initialValues: editProduct
      ? {
          name: editProduct.name,
          description: editProduct.description,
          price: editProduct.price,
          category: editProduct.category,
          isActive: editProduct.isActive,
          images: editProduct.images,
        }
      : {
          name: "",
          description: "",
          price: 0,
          category: { id: "", title: "" },
          isActive: true,
          images: [],
        },
    validate: zodResolver(formSchema),
  });

  const { values, isDirty } = form;

  // Update the hasUnsavedChanges state when form values change
  useEffect(() => {
    const hasChanges = isDirty();
    setHasUnsavedChanges(hasChanges);
  }, [values, setHasUnsavedChanges, isDirty]);

  // State for category search
  const [search, setSearch] = useState<string>(
    form.values.category.title || ""
  );

  // Filter categories based on search
  const shouldFilterOptions = mockData.categories.every(
    (item) => item.title !== search
  );
  const filteredCategories = shouldFilterOptions
    ? mockData.categories.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase().trim())
      )
    : mockData.categories;

  // Render category options
  const categoryOptions = filteredCategories.map((category) => (
    <Combobox.Option value={category.id} key={category.id}>
      {category.title}
    </Combobox.Option>
  ));

  // Handle form submission
  const handleSubmit = async (values: ProductFormValues) => {
    try {
      startLoading();
      await onSubmit(values);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <ImageUpload
          {...form.getInputProps("images")}
          onChange={(files) => {
            form.setFieldValue("images", files);
          }}
        />

        <TextInput
          required
          label="Product Name"
          placeholder="Enter product name"
          {...form.getInputProps("name")}
        />

        <Textarea
          required
          label="Description"
          placeholder="Enter product description"
          minRows={3}
          {...form.getInputProps("description")}
        />

        <NumberInput
          required
          label="Price"
          placeholder="Enter price"
          decimalScale={2}
          min={0}
          prefix="₱"
          {...form.getInputProps("price")}
        />

        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            const selectedCategory = mockData.categories.find(
              (c) => c.id === val
            );
            if (selectedCategory) {
              form.setFieldValue("category", {
                id: selectedCategory.id,
                title: selectedCategory.title,
              });
              setSearch(selectedCategory.title);
            }
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              label="Category"
              withAsterisk
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.openDropdown()}
              onFocus={() => combobox.openDropdown()}
              onBlur={() => {
                combobox.closeDropdown();
                setSearch(form.values.category.title || "");
              }}
              placeholder="Select a category"
              value={search}
              onChange={(event) => {
                setSearch(event.currentTarget.value);
                form.setFieldValue("category", { id: "", title: "" });
                combobox.updateSelectedOptionIndex();
                combobox.openDropdown();
              }}
              error={form.errors.category}
            />
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>
              {categoryOptions.length > 0 ? (
                categoryOptions
              ) : (
                <Combobox.Empty>Nothing found</Combobox.Empty>
              )}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>

        <Box>
          <Text fw={500} size="sm" mb="xs">
            Status
          </Text>
          <SegmentedControl
            fullWidth
            data={[
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ]}
            value={form.values.isActive.toString()}
            onChange={(value) =>
              form.setFieldValue("isActive", value === "true")
            }
          />
        </Box>

        <Group justify="flex-end" mt="xl">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Save Product
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
