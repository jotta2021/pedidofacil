const FormatCurrency = (value:number) => {
    
    const formatNumber = Intl.NumberFormat('pt-BR',{
        currency:'BRL',
        style:'currency'
    }).format(Number(value))
    return formatNumber;
}
 
export default FormatCurrency;