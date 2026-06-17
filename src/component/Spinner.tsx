import '../style/Spinner.css'

type SpinnerProps = {
    text: string;
}

function Spinner(props: SpinnerProps) {
    return (
        <div className="loadingIndicator" aria-live="polite">
            <div className="spinner" aria-label="Loading"></div>
            <p>{props.text}</p>
        </div>
    )
}

export default Spinner;