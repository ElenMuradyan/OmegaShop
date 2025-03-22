import { supabase } from "../../services/supabase/supabase";
import { handleChangeStatusInterface } from "../../typescript/interfaces/updateOrderStatus ";

export const handleChangeStatus = async ({order, setModalOpen, prev, next} : handleChangeStatusInterface) => {
    try{
      const { error } = await supabase
      .from('orders')
      .update({
        status: next
      })
      .eq('id', order.id);

      const { data: seller, error: dbError } = await supabase
      .from('sellers')
      .select('*')
      .eq('email', order.sellerEmail)
      .single();

      if(dbError) throw dbError;

      const { error: updateError } = await supabase
      .from('sellers')
      .update({
        [prev]: seller[prev].filter((item: string) => item !== order.id),
        [next]: [... seller[next], order.id],
        })
      .eq('email', order.sellerEmail);

      if (error || updateError) throw error ? error : updateError; 
    }catch(err: any){
      console.log(err.message);
    }finally{
      setModalOpen(false)
    }
};




