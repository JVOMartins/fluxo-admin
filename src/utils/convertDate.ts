const convertDate = (date: string): string => {
  const options: any = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  return new Intl.DateTimeFormat('pt-Br', options).format(new Date(date))
}

export default convertDate
