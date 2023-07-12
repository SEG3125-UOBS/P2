import { Link, useParams } from "react-router-dom";
import data from './data.json'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const ForumPost = () => {
    const forumData = data.forums;

    const {postId} = useParams()
    const mainPost = forumData.filter(post => post.id===parseInt(postId))[0]

    const [showReplyPrompt, setReplyPrompt] = useState(null)
    function onReplyClick(replyToId){
        if (replyToId===showReplyPrompt) {
            setReplyPrompt(null);
        } else {
            setReplyPrompt(replyToId)
        }   
    }

    // Function to display the replies to a post
    function recursiveDisplay(post) {
        const displayArray = [];

        for (let i=0;i<post.replies.length;i++) {
            const replyId = parseInt(post.replies[i]);
            const reply = forumData.filter(post => post.id===replyId)[0];
            
            displayArray.push(
                <div className="p-4 m-4 bg-custom align-items-start" style={{textAlign:"start"}} key={reply.id}>
                    <p className="pt-3">{reply.text}</p>
                    <div style={{textAlign:"end"}}>
                        <Button variant="outline-secondary" onClick={() => onReplyClick(replyId)}>Reply</Button>
                    </div>
                </div>
            );

            const recursiveResult = recursiveDisplay(reply)
            if (recursiveResult !== undefined) {
                displayArray.push(
                    recursiveResult
                );
            }
        }
        
        if (displayArray.length === 0) {
            return
        } else {
            return <div className="ps-4 ms-4" key={post.id+"childBox"}>{displayArray}</div>;
        }
    }

    const [showAlert,setAlert] = useState(-1)
    function onCompleteClick() {
        const text = document.getElementById("forumText");

        var display=1;
        if (text.value==="") {
            display=0;
            text.style.border = "1px solid #ff0000";
        } else {text.style.border = "";}

        setAlert(display);
    }

    return (
        <div className="forumPost">
            <div className="d-flex ps-4 m-4 justify-content-start">
                <Link to="/forums" >&lt; Back to Forum list</Link>
            </div>

            {/* Alerts */}
            <Alert show={showAlert===1} onClose={()=>setAlert(-1)} variant="success" className="m-4" dismissible>
                <Alert.Heading>
                    <div>Forum Reply Created</div>
                </Alert.Heading>
                <p>
                Congratulations! Your forum reply has been submitted and is awaiting manual review. It will be posted shortly.
                <br></br>
                You may close this page.
                </p>
            </Alert>
            <Alert show={showAlert===0} variant="danger" onClose={()=>setAlert(-1)} className="m-4" dismissible>
                <Alert.Heading>
                    <div>Forum Reply Error</div>
                </Alert.Heading>
                <p>
                There was a problem creating your forum reply. Check your reply details and try again.
                </p>
            </Alert>

            {/* User reply section */}
            {
                showReplyPrompt!==null &&
                <div className="m-4 newReply">
                    <p style={{textAlign:"start",overflow:"hidden",textOverflow:"ellipsis"}}><nobr>Replying to: "{forumData.filter(post => post.id===parseInt(showReplyPrompt))[0].text}"</nobr></p>
                    <textarea className="form-control mt-2" id="forumText" placeholder="Forum Post Text" rows={5}></textarea>
                    <Button className="m-2" variant="outline-primary" onClick={()=>onCompleteClick()}>Submit Reply</Button>
                </div>
            }
        
            {/* Post card */}
            <div className="p-4 m-4 bg-custom" style={{textAlign:"start"}}>
                <h1>{mainPost.title}</h1>
                <h2 className="lead fw-bold">Product: {mainPost.item}</h2>
                <p className="pt-3">{mainPost.text}</p>
                <div style={{textAlign:"end"}}>
                    <Button variant="outline-secondary" onClick={() => onReplyClick(mainPost.id)}>Reply</Button>
                </div>
            </div>

            {/* Replies */}
            {recursiveDisplay(mainPost)}

            
        </div>
    );
}

export default ForumPost;