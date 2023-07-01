import { Link, useParams } from "react-router-dom";
import data from './data.json';

const Item = () => {
    const itemData = data.items;
    const {itemId} = useParams()
    const mainItem = itemData.filter(item => item.id===parseInt(itemId))[0]

    return (
        <div className="itemPage">
            <div className="d-flex ps-4 m-4 justify-content-start">
                <Link to="/store" >&lt; Back to Store page</Link>
            </div>
            
        </div>
    );
}

export default Item;