

import { Box, Typography, styled } from '@mui/material';
import { useOutletContext, useLocation } from 'react-router-dom';
import { emptyProfilePic } from '../constants/constant';
import { ArrowBack, Delete } from '@mui/icons-material';

const IconWrapper = styled(Box)({
    padding: 15
});

const Subject = styled(Typography)({
    fontSize: 22,
    margin: '10px 0 20px 75px',
    display: 'flex'
})

const Indicator = styled(Box)`
    font-size: 12px !important;
    background: #ddd;
    color: #222;
    border-radius: 4px;
    margin-left: 6px;
    padding: 2px 4px;
    align-self: center;
`;

const Image = styled('img')({
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 10px 0 10px',
    backgroundColor: '#cccccc'
});

const Container = styled(Box)({
    marginLeft: 15,
    width: '100%',
    '& > div': {
        display: 'flex',
        '& > p > span': {
            fontSize: 12,
            color: '#5E5E5E'
        }
    }
});

const Date = styled(Typography)({
    margin: '0 50px 0 auto',
    fontSize: 12,
    color: '#5E5E5E'
})

const ViewEmail = (openDrawer, mailboxEndpoint) => {

 
    
    const { state } = useLocation();
    const { email } = state;

    return (
        <Box style={openDrawer ? { marginLeft: 200, width: '84%' } : { marginLeft: 16, width: '98%' } }>
            <IconWrapper>
                <ArrowBack fontSize='small' color="action" onClick={() => window.history.back() } />
                <Delete fontSize='small' color="action" style={{ marginLeft: 40 }} />
            </IconWrapper>
            <Subject>{email.subject} <Indicator component="span">Inbox</Indicator></Subject>
            <Box style={{ display: 'flex' }}>
                <Image src={emptyProfilePic} alt="profile" />
                <Container>
                    <Box>
                        <Typography>    
                            {email.to.split('@')[0]} 
                            <Box component="span">&nbsp;&#60;{email.to}&#62;</Box>
                        </Typography>
                        <Date>
                            {(new window.Date(email.sentAt)).getDate()}&nbsp;
                            {(new window.Date(email.sentAt)).toLocaleString('default', { month: 'long' })}&nbsp;
                            {(new window.Date(email.sentAt)).getFullYear()} 
                        </Date>
                    </Box>
                    <Typography variant="body1" style={{ width: '100%', whiteSpace: 'pre-wrap' }}>
                    {email.body}
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}

export default ViewEmail;