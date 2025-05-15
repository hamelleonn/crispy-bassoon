export interface Product {
  id: string;
  itemId: string;
  phoneId?: string; // або викидай, якщо не юзається
  name: string;
  category: string;
  image: string;
  price: number;
  fullPrice: number;
  size: 'mini' | 'small' | 'medium' | 'large';
  color: string;
}
