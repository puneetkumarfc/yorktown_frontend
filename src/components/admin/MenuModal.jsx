import React, { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "./CustomButton";

const MenuModal = ({ open, onClose, item, mode, onSave }) => {
  if (!open) return null;
  const [editItem, setEditItem] = useState(
    item || {
      name: "",
      category: "",
      price: "",
      status: "Active",
      description: "",
    }
  );
  const isView = mode === "view";
  const isEdit = mode === "edit" || mode === "add";
  const isAdd = mode === "add";
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const statusOptions = ["Active", "Inactive"];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      name: item?.name || "",
      category: item?.category || "",
      price: item?.price || "",
      status: item?.status || "Active",
      description: item?.description || "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (open) {
      reset({
        name: item?.name || "",
        category: item?.category || "",
        price: item?.price || "",
        status: item?.status || "Active",
        description: item?.description || "",
      });
    }
  }, [open, item, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };

  // Helper for input styling
  const inputStyle = {
    marginLeft: 0,
    background: isView ? "#f1eee8" : undefined,
  };

  const menuFields = [
    {
      name: "Name",
      key: "name",
      type: "text",
      value: editItem.name,
      disabled: !isEdit,
      required: true,
      readOnly: isView,
    },
    {
      name: "Category",
      key: "category",
      type: "text",
      value: editItem.category,
      disabled: !isEdit,
      required: true,
      readOnly: isView,
    },
    {
      name: "Price",
      key: "price",
      type: "number",
      value: editItem.price,
      disabled: !isEdit,
      required: true,
      readOnly: isView,
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold font-roboto_serif text-black">
            {isAdd ? "Add Menu Item" : isView ? "Menu Item Details" : "Edit Menu Item"}
          </h2>
          <button
            className="text-gray-400 hover:text-black text-2xl font-bold bg-transparent border-none cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {menuFields.map((field) => (
                <div
                  key={field.key}
                  className="flex flex-col gap-0 text-black font-normal relative"
                >
                  <label className="font-normal text-sm font-roboto">
                    {field.name}
                  </label>
                  <input
                    className="bg-white border placeholder:text-black/30 placeholder:text-sm border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black text-black"
                    type={field.type}
                    disabled={field.disabled}
                    readOnly={field.readOnly}
                    placeholder={
                      field.type === "number"
                        ? `Enter ${field.name}`
                        : `Enter ${field.name}`
                    }
                    {...register(field.key, {
                      required: `${field.name} is required`,
                      ...(field.type === "number" && {
                        valueAsNumber: true,
                        validate: (v) =>
                          (v !== "" && !isNaN(v)) ||
                          `${field.name} must be a number`,
                      }),
                    })}
                  />
                  {isSubmitted && errors[field.key] && (
                    <span className="absolute left-0 -bottom-5 text-xs text-red-600 pointer-events-none select-none whitespace-nowrap">
                      {errors[field.key].message}
                    </span>
                  )}
                </div>
              ))}
              
              {/* Status - custom dropdown */}
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <div className="flex flex-col gap-1 text-black font-normal relative">
                    <span className="font-normal text-sm font-roboto">
                      Status
                    </span>
                    <button
                      type="button"
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between w-full focus:outline-none focus:ring-2 focus:ring-black text-black"
                      onClick={() => isEdit && setShowStatusDropdown((v) => !v)}
                      disabled={!isEdit}
                    >
                      <span>{field.value}</span>
                      <ChevronDown
                        className={`text-gray-400 ml-2 transition-transform duration-200 ${
                          showStatusDropdown ? "rotate-180" : ""
                        }`}
                        size={20}
                      />
                    </button>
                    {showStatusDropdown && isEdit && (
                      <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {statusOptions.map((option) => (
                          <li
                            key={option}
                            onClick={() => {
                              field.onChange(option);
                              setShowStatusDropdown(false);
                            }}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-black font-normal`}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                    {isSubmitted && errors.status && (
                      <span className="absolute left-0 -bottom-5 text-xs text-red-600 pointer-events-none select-none whitespace-nowrap">
                        {errors.status.message}
                      </span>
                    )}
                  </div>
                )}
              />

              {/* Description - spans full width */}
              <div className="md:col-span-2 flex flex-col gap-0 text-black font-normal relative">
                <label className="font-normal text-sm font-roboto">
                  Description
                </label>
                <textarea
                  className="bg-white border placeholder:text-black/30 placeholder:text-sm border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black text-black resize-none"
                  rows={4}
                  disabled={!isEdit}
                  readOnly={isView}
                  placeholder="Enter Description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {isSubmitted && errors.description && (
                  <span className="absolute left-0 -bottom-5 text-xs text-red-600 pointer-events-none select-none whitespace-nowrap">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5">
            <CustomButton text={"Cancel"} active={false} onClick={onClose} />

            {isEdit && (
              <CustomButton
                text={`${isAdd ? "Add" : "Save"}`}
                active={true}
                type={"submit"}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuModal;
