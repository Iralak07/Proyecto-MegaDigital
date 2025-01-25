import db from '../db';

export const existeCorreo = async (correo: string): Promise<boolean> => {
    const query = 'SELECT id FROM persona WHERE correo = ? LIMIT 1';
    const [result]: any = await db.query(query, [correo]);
    return result.length > 0;
};

export const existeDocumento = async (nrodocumento: string): Promise<boolean> => {
    const query = 'SELECT id FROM persona WHERE nrodocumento = ? LIMIT 1';
    const [result]: any = await db.query(query, [nrodocumento]);
    return result.length > 0;
};


export const existePersona = async (id: number): Promise<boolean> => {
    const query = 'SELECT id FROM persona WHERE id = ? LIMIT 1';
    const [result]: any = await db.query(query, [id]);
    return result.length > 0;
};
