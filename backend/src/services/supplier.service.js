const Supplier = require("../models/supplier.model");

// Create Supplier
const createSupplier = async (supplierData) => {

    return await Supplier.create(supplierData);

};

// Get All Suppliers
const getAllSuppliers = async (
    search = "",
    page = 1,
    limit = 10
) => {

    const query = {};

    if (search) {
        query.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                companyName: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    const skip = (page - 1) * limit;

    const suppliers = await Supplier.find(query)
        .sort({
            createdAt: -1
        })
        .skip(skip)
        .limit(limit);

    const totalSuppliers = await Supplier.countDocuments(query);

    return {
        suppliers,
        totalSuppliers,
        currentPage: Number(page),
        totalPages: Math.ceil(totalSuppliers / limit)
    };

};

// Get Supplier By ID
const getSupplierById = async (id) => {

    return await Supplier.findById(id);

};

// Update Supplier
const updateSupplier = async (id, supplierData) => {

    return await Supplier.findByIdAndUpdate(
        id,
        supplierData,
        {
            new: true,
            runValidators: true
        }
    );

};

// Delete Supplier
const deleteSupplier = async (id) => {

    return await Supplier.findByIdAndDelete(id);

};

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};