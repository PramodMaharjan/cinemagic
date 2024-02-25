
const FormatDate = (dateString, yearOnly) => {
    const options = yearOnly ? { year: 'numeric' } : { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
}


export default FormatDate
