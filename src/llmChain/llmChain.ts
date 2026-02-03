import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai"; 
import { LLMChain } from "langchain/chains";



await persionalistPitch("Angular 19", "new Feture", 50);

async function persionalistPitch(cource:string,role:string,wordLimit:number) {
        
    const promptsTemplate = new PromptTemplate({
        template: "Describe the importance of learning {cource} for a {role}. Limit the output to {wordLimit}",
        inputVariables: ["cource", "role", "wordLimit"]
    })

    const formattedPrompt = await promptsTemplate.format({
        cource,
        role,
        wordLimit
    })

    console.log("Formatted Prompt ",formattedPrompt);

    const llm = new ChatOpenAI();
    const outputParser = new StringOutputParser();

    // Option 1 - LangChain Legacy chain 

    const legacyChain = new LLMChain({
        prompt: promptsTemplate,
        llm,
        outputParser
    })

    const answer = await legacyChain.invoke({
        cource, role, wordLimit
    })

    console.log("answer > ", answer);
    
    /// Option 2 LCEL  Chain

    // const lcelChain = promptsTemplate.pipe(llm).pipe(outputParser); //or new approch
 
    const lcelChain = RunnableSequence.from([
        promptsTemplate,
        llm,
        outputParser
    ])

    const lcelResponse = await lcelChain.invoke({
        cource,
        role,
        wordLimit
    })
    
    console.log("Ans >>> ", lcelResponse);
    
}


