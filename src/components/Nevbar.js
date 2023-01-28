import TerminalIcon from '@mui/icons-material/Terminal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Nevbar = _ => {
    return(
        <div className="nevbar">
            <span className='flex-container' ><TerminalIcon/>LetsCode</span>
            <AccountCircleIcon/>
        </div>
    );
}

export default Nevbar;