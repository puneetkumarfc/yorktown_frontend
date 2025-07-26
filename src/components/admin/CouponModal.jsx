import React, { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "./CustomButton";

const CouponModal = ({ open, onClose, coupon, mode, onSave }) => {
  if (!open) return null;
  const [editCoupon, setEditCoupon] = useState(
    coupon || {
      code: "",
      discountType: "PERCENT",
      discount: "",
      maxDiscountAmount: "",
      minOrderAmount: "",
      startDate: "",
      expiry: "",
      status: "Active",
      maxUsesPerUser: "",
      // orderType: 'BOTH', // will be sent as static in API integration
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
      code: coupon?.code || "",
      discountType: coupon?.discountType || "PERCENT",
      discount: coupon?.discount || "",
      maxDiscountAmount: coupon?.maxDiscountAmount || "",
      minOrderAmount: coupon?.minOrderAmount || "",
      startDate: coupon?.startDate || "",
      expiry: coupon?.expiry || "",
      status: coupon?.status || "Active",
      maxUsesPerUser: coupon?.maxUsesPerUser || "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (open) {
      reset({
        code: coupon?.code || "",
        discountType: coupon?.discountType || "PERCENT",
        discount: coupon?.discount || "",
        maxDiscountAmount: coupon?.maxDiscountAmount || "",
        minOrderAmount: coupon?.minOrderAmount || "",
        startDate: coupon?.startDate || "",
        expiry: coupon?.expiry || "",
        status: coupon?.status || "Active",
        maxUsesPerUser: coupon?.maxUsesPerUser || "",
      });
    }
  }, [open, coupon, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };

  // Helper for input styling
  const inputStyle = {
    marginLeft: 0,
    background: isView ? "#f1eee8" : undefined,
  };

  const couponFields = [
    {
      name: "Code",
      key: "code",
      type: "text",
      value: editCoupon.code,
      disabled: !isEdit,
      required: true,
      readOnly: isView,
    },
    {
      name: "Discount",
      key: "discount",
      type: "number",
      value: editCoupon.discount,
      disabled: !isEdit,
      required: true,
      readOnly: isView,
    },
    {
      name: "Maximum Discount Amount",
      key: "maxDiscountAmount",
      type: "number",
      value: editCoupon.maxDiscountAmount,
      disabled: !isEdit,
      required: true,
      readOnly: isView,
    },
    {
      name: "Minimum Order Amount",
      key: "minOrderAmount",
      type: "number",
      value: editCoupon.minOrderAmount,
      disabled: !isEdit,
      required: true,
      readOnly: isView,
    },
    {
      name: "Start Date",
      key: "startDate",
      type: "date",
      value: editCoupon.startDate,
      disabled: !isEdit,
      required: true,
      readOnly: isView,
    },
    {
      name: "Expiry",
      key: "expiry",
      type: "date",
      value: editCoupon.expiry,
      disabled: !isEdit,
      required: true,
      readOnly: isView,
    },
    {
      name: "Max Uses Per User",
      key: "maxUsesPerUser",
      type: "number",
      value: editCoupon.maxUsesPerUser,
      disabled: !isEdit,
      required: true,
      readOnly: isView,
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-mainBg rounded-xl shadow-2xl border border-gray-200 w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold font-roboto_serif text-black">
            {isAdd ? "Add Coupon" : isView ? "Coupon Details" : "Edit Coupon"}
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
              {couponFields.map((field) => (
                <div
                  key={field.key}
                  className="flex flex-col gap-0 text-black font-normal relative"
                >
                  <label className="font-normal text-sm font-roboto">
                    {field.name}
                  </label>
                  <input
                    className="bg-mainBg border placeholder:text-black/30 placeholder:text-sm border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black text-black"
                    type={field.type}
                    disabled={field.disabled}
                    readOnly={field.readOnly}
                    placeholder={
                      field.type === "date"
                        ? `Select ${field.name}`
                        : field.type === "number"
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
              {/* Discount Type - custom black-filled radios */}
              <Controller
                name="discountType"
                control={control}
                rules={{ required: "Discount Type is required" }}
                render={({ field }) => (
                  <div className="flex flex-col gap-1 text-black font-normal relative">
                    <span className="font-normal text-sm font-roboto">
                      Discount Type
                    </span>
                    <div className="flex gap-6 items-center mt-1">
                      {[
                        { label: "Percent", value: "PERCENT" },
                        { label: "Flat", value: "FLAT" },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-center gap-2 font-normal cursor-pointer select-none"
                        >
                          <span
                            className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center transition-colors duration-150 ${
                              field.value === opt.value
                                ? "bg-black border-black"
                                : "bg-mainBg"
                            }`}
                            style={{ minWidth: 20 }}
                          >
                            {field.value === opt.value && (
                              <span className="block w-2.5 h-2.5 rounded-full bg-mainBg" />
                            )}
                          </span>
                          <input
                            type="radio"
                            name="discountType"
                            checked={field.value === opt.value}
                            disabled={!isEdit}
                            onChange={() => field.onChange(opt.value)}
                            readOnly={isView}
                            className="sr-only"
                          />
                          <span className="font-normal">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                    {isSubmitted && errors.discountType && (
                      <span className="absolute left-0 -bottom-5 text-xs text-red-600 pointer-events-none select-none whitespace-nowrap">
                        {errors.discountType.message}
                      </span>
                    )}
                  </div>
                )}
              />
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
                      className="bg-mainBg border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between w-full focus:outline-none focus:ring-1 focus:ring-black text-black"
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
                      <ul className="absolute top-full left-0 right-0 mt-2 bg-mainBg border border-gray-200 rounded-lg shadow-lg z-10">
                        {statusOptions.map((option) => (
                          <li
                            key={option}
                            onClick={() => {
                              field.onChange(option);
                              setShowStatusDropdown(false);
                            }}
                            className={`px-4 py-2 cursor-pointer hover:bg-black/5 text-black font-normal`}
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

export default CouponModal;
