import React,{useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct } from '../redux/actions/productActions';


const ProductDetails = () => {
   const product =  useSelector((state) => state.product);
   const{image,title,price,category,description} =product;
  const {productId} = useParams();
  const dispatch =useDispatch();
  console.log(product);

  const fetchProductDetail = async () => 
  {
      const response = await axios.get(`https://fakestoreapi.com/products/${productId}`) .catch(err => {
          console.log("Err", err);
      });

      dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if(productId && productId != "")
    fetchProductDetail();
  
    
  }, [productId]);
  
return(

  
        <div className='ui grid container'>
            {Object.keys(product).length === 0 ? (
                <div>...Loading </div>
            ) : (
                <div className='ui placeholder segment' >
                    <div className='ui two column stackable center aligned grid'>
                        <div className='ui vertical divider' style={{position:'absolute', top:'300px'}}>AND</div>
                        <div className='middle aligned row'>
                            <div className='column lp'>
                                <img className='ui fluid image' style={{position:'relative', right:'250px', width:'400px'}} src={image} />
                            </div>
                            <div style={{position:'relative', left:'270px', bottom:'600px'}} className="column rp">
                                <h1  style={{fontSize:'40px'}}>{title}</h1>
                                <h2>
                                    <a   className='ui teal tag label'>$ {price}</a>
                                </h2>
                                <h3 className='ui brown block header'>{category}</h3>
                                <p style={{fontSize:'17px'}}>{description}</p>
                                <div className="ui vertical animated button " tabIndex='0'>
                                    <div className="hidden content ">
                                       <i className="shop icon"></i>
                                    </div>
                                    <div  className="visible content">Add to Cart</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
          
        </div>
    
)

}

export default ProductDetails