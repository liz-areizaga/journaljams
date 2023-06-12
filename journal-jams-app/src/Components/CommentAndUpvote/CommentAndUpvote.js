import './CommentAndUpvote.css'

import {useState} from 'react';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import AddCommentIcon from '@mui/icons-material/AddComment';

import {Box} from '@mui/material';
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

export default function Comment(props) {

    const [vote, setVote] = useState(0);

    const increase = () => {
        setVote(vote + 1);
    };
    
    const decrease = () => {
        setVote(vote - 1);
    };

    return (
        <Box id="commentContainer">   
            <Box>
                <Box id = "username">{props.username}</Box>
                <Box id = "postMessage">{props.postMessage}</Box>
                <Box id = "arrow_container">
                    <Stack direction="column" spacing = {2}>
                        <IconButton id = "arrows" onClick = {increase}>
                            <KeyboardArrowUpIcon/> 
                        </IconButton>
                        <span id = "vote">{vote}</span>
                        <IconButton id = "arrows" onClick = {decrease}>
                            <KeyboardArrowDownIcon /> 
                        </IconButton>
                    </Stack>
                </Box>
            </Box>
        </Box> 
    );
}