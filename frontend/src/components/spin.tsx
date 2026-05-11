import '../css/component/spin.css'
type ProcessingSpinerProps = {
  text: string;
};

export const ProcessingSpiner = ({ text }: ProcessingSpinerProps) => {
  return(
    <div>
        <div className="spinner-container">
          <div className="spinner-content-2">
            <div className="spinner-sub-container">
              <div className="spinner"></div>
            </div>
            <p className='md-text text-center light-text'>{text}...</p>
          </div>
        </div>

    </div>
  )
}
