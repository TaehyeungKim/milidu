export const age = (birthdate: string, point: string) => {
    const [birth, mark] = [new Date(birthdate), new Date(point)]
    
    const [b_year, b_month, b_day] = [birth.getFullYear(), birth.getMonth(), birth.getDate()];
    const [m_year, m_month, m_day] = [mark.getFullYear(), mark.getMonth(), mark.getDate()];
    
    const yearOffset = m_year - b_year;

    if(b_month < m_month || (b_month === m_month && b_day <= m_day)) return yearOffset

    return yearOffset - 1;
    
}