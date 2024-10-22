import { useTheme } from '../../context/Theme/ThemeContext';



export default function PurchaseCompleted() {
  const { theme } = useTheme();


  
  return (
    <>
      <div id='background' 
      className={`overflow-hidden md:min-h-[550px] md:min-w-[600px] w-full flex flex-col gap-5 items-center justify-center bg-gradient-to-b 
      ${theme === 'dark' ? 'from-bgdarkpurple to-bgdarkblue/80 to-70% text-neutral-200' 
      : 'from-emerald-300 via-gray-100 via-[6%] to-white to-100% text-stone-900'}  `}>
        
        <div title="textos" className="mt-24 md:mt-48 w-11/12 h-5/6">
          <div className="flex flex-col md:flex-row justify-center">
            <div className="font-mono text-3xl md:text-7xl mt-10 mr-9">Parabéns pela sua aquisição!</div>
            <div className="text-justify mt-5">
              <div className="italic font-mono text-xl mt-10">Você acaba de adquirir uma ideia confiável, testada sob os mais altos padrões e com a garantia de que não irá se voltar contra você, seja nas formas comuns de pensamentos intrusivos e obsessivos, por meio de sonhos inesperados, ou mesmo através de profecias e/ou premonições! </div>
              <div className="italic font-mono text-xl mt-10"> Se você gostar de usar sua nova idéia, não deixe de nos marcar nas redes sociais ou comentar com seus amigos sobre a Saposo! </div>
            </div>
          </div>
          <div className="font-mono md:text-6xl mt-10 md:mr-14 flex justify-end">o Saposo agradece,</div>
        </div>
        

        <div id="big saposo" className="mt-10 md:mt-0 mb-10 md:mb-0 flex justify-start">
          <img src="assets/saposobig.png" className="w-[60%]"></img>
          <div className="md:mt-48">vlw</div>
        </div>
        
        <div id="caixa do aviso misterioso" 
        className={` mb-10 flex flex-col items-center gap-6 shadow-lg shadow-[#874e96] rounded-t-md rounded-bl-[100px] border-t border-r border-[#73ff00] 
        ${theme === 'dark' ? 'bg-[#1d1d1d]' 
        : 'bg-slate-400/30 shadow-inner border-b border-[6px]'}`}>
          
          <div id="grande sapo de chapéu" className="mx-20 mt-14 mb-4">onde será que as ideias</div>
          <div id="grande sapo de chapéu" className="mb-10">poderiam nos levar?</div>
        </div>

      </div>
    </>
  )
}

 


