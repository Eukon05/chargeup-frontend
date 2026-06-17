import '../style/Spinner.css'
import type {SpinnerProps} from '../props/SpinnerProps.ts'

function Spinner(props: SpinnerProps) {
    return (
        <div className="loadingIndicator" aria-live="polite">
            <div className="spinner" aria-label="Loading"></div>
            <p>{props.text}</p>
        </div>
    )
}

export default Spinner;