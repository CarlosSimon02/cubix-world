"use client";

import handleServerActionResponse from "@/utils/handleServerActionResponse";
import { Drawer, LoadingOverlay, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import createProductAction from "../../_actions/createProductAction";
import useProductDrawerStore from "../../_stores/useProductDrawerStore";
import ProductForm, { ProductFormValues } from "./ProductForm";

export default function ProductFormDrawer() {
  const queryClient = useQueryClient();
  const { isOpen, editProduct, closeDrawer, hasUnsavedChanges } =
    useProductDrawerStore();
  const [isSubmitting, { open: startSubmitting, close: stopSubmitting }] =
    useDisclosure(false);

  // Function to handle closing with unsaved changes
  const handleClose = () => {
    if (hasUnsavedChanges) {
      // Show confirmation dialog
      modals.openConfirmModal({
        title: "Unsaved Changes",
        children: (
          <Text size="sm">
            You have unsaved changes. Are you sure you want to close this form?
          </Text>
        ),
        labels: { confirm: "Yes, close", cancel: "No, continue editing" },
        confirmProps: { color: "red" },
        onCancel: () => {},
        onConfirm: () => closeDrawer(),
      });
    } else {
      closeDrawer();
    }
  };

  // Handle form submission
  const handleSubmit = async (formData: ProductFormValues) => {
    try {
      startSubmitting();

      // Add any fields needed for product creation/update
      const productData = {
        ...formData,
        id: editProduct?.id,
      };

      // Submit the form data to the server action
      handleServerActionResponse(await createProductAction(productData));

      // Show success notification
      notifications.show({
        title: editProduct ? "Product Updated" : "Product Created",
        message: `Product ${editProduct ? "updated" : "created"} successfully!`,
        color: "teal",
      });

      // Invalidate products query to refetch data
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Close the drawer
      closeDrawer();
    } catch (error) {
      // Show error notification
      notifications.show({
        title: "Error",
        message:
          error instanceof Error ? error.message : "Failed to save product",
        color: "red",
      });
    } finally {
      stopSubmitting();
    }
  };

  return (
    <Drawer
      opened={isOpen}
      onClose={handleClose}
      title={editProduct ? "Edit Product" : "Add New Product"}
      position="right"
      size="lg"
      padding="xl"
    >
      <LoadingOverlay visible={isSubmitting} />
      <ProductForm onSubmit={handleSubmit} onCancel={handleClose} />
    </Drawer>
  );
}
