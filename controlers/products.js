const { Product } = require("../models/products")

// exports.getAllProducts = async (req,res)=>{
//     console.log("running")
//    const products = await Product.find({ }).exec()
//    try{
//         await res.status(200).json(products)
//    }catch(err){
//         res.status(500).json({msg:"product not found"})
//    }
// } 
exports.getProductById = async (req,res)=>{
    const id = req.params.id
   const product = await Product.findOne({_id:id}).exec()
   try{
        await res.status(200).json(product)
   }catch(err){
        res.status(500).json({msg:"product not found"})
   }
} 

exports.deleteProduct = async (req,res)=>{
    const id = req.params.id
   const product = await Product.findByIdAndDelete({_id:id}).exec()
   try{
        await res.status(200).json({msg:"deleted succesfully"})
   }catch(err){
        res.status(500).json({msg:"product not found"})
   }
} 

exports.addProducts = async (req,res)=>{
    const newPost = new Product(req.body)
    try{
        await newPost.save()
        res.status(200).json({msg:"Post created"})
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getAllProducts = async (req,res)=>{
  
  const {
    page = 1,
    limit = 10,
    category,
    brand,
    minPrice,
    maxPrice,
    sortField,
    sortDirection = 'asc',
    title
  } = req.query;
  const totalPosts = await Product.countDocuments().exec();
  const totalPages = Math.floor(totalPosts%limit===0? totalPosts/limit : totalPosts/limit+1)
  console.log(totalPages)

  // Calculate skip value based on page and limit
  const skip = (Number(page) - 1) * Number(limit);

  // Construct the base query to filter products
  const query = Product.find({});

  if (title) {
    query.where('title').regex(new RegExp(title, 'i'));
  }

  if (category) {
    query.where('category').equals(category);
  }

  if (brand) {
    query.where('brand').equals(brand);
  }

  if (minPrice !== undefined && !isNaN(minPrice)) {
    query.where('price').gte(Number(minPrice));
  }

  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    query.where('price').lte(Number(maxPrice));
  }

  // Apply sorting
  if (sortField === 'price' || sortField === 'rating') {
    const sortDirectionValue = sortDirection === 'desc' ? -1 : 1;
    query.sort({[sortField]: sortDirectionValue });
  }

  try {
    // Execute the query with pagination
    const products = await query
      .skip(skip)
      .limit(Number(limit))
      .exec();
      res.set("Total-Page", totalPages)
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving products' });
  }
}