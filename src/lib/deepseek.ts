/**
 * DeepSeek API 服务模块
 * 用于处理简历优化和内容生成
 */

export interface DeepSeekRequest {
  personalInfo: string;
  targetJob?: string;
  model?: string;
}

export interface DeepSeekResponse {
  optimizedResume: string;
  suggestions: string[];
  keywords: string[];
}

export interface DeepSeekError {
  error: string;
  message: string;
  code?: number;
}

class DeepSeekService {
  private apiKey: string;
  private baseUrl: string = 'https://api.deepseek.com/v1';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '';
    
    // 开发环境下的临时API密钥（请替换为您的真实密钥）
    if (!this.apiKey && process.env.NODE_ENV === 'development') {
      this.apiKey = 'sk-your-deepseek-api-key-here';
    }
  }

  /**
   * 优化简历内容
   */
  async optimizeResume(request: DeepSeekRequest): Promise<DeepSeekResponse> {
    if (!this.apiKey) {
      throw new Error('DeepSeek API密钥未配置');
    }

    const prompt = this.buildPrompt(request);
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: request.model || 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的简历优化专家，擅长根据岗位要求优化简历内容，提高简历的匹配度和专业性。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = `API请求失败: ${errorData.error?.message || response.statusText}`;
        
        // 提供更友好的错误信息
        if (response.status === 401) {
          errorMessage = 'API密钥无效，请检查配置。运行 ./fix-api-key.sh 重新配置';
        } else if (response.status === 429) {
          errorMessage = '请求频率过高，请稍后重试';
        } else if (response.status >= 500) {
          errorMessage = '服务器错误，请稍后重试';
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return this.parseResponse(data);
    } catch (error) {
      console.error('DeepSeek API调用失败:', error);
      throw error;
    }
  }

  /**
   * 构建优化提示词
   */
  private buildPrompt(request: DeepSeekRequest): string {
    let prompt = `请帮我优化以下简历内容：\n\n`;
    
    prompt += `【个人信息】\n${request.personalInfo}\n\n`;
    
    if (request.targetJob) {
      prompt += `【目标岗位要求】\n${request.targetJob}\n\n`;
      prompt += `请根据目标岗位要求，优化简历内容，包括：\n`;
      prompt += `1. 调整关键词匹配\n`;
      prompt += `2. 优化工作经历描述\n`;
      prompt += `3. 突出相关技能和经验\n`;
      prompt += `4. 提供改进建议\n\n`;
    } else {
      prompt += `请优化简历内容，使其更加专业和吸引人，包括：\n`;
      prompt += `1. 改进语言表达\n`;
      prompt += `2. 优化结构布局\n`;
      prompt += `3. 突出个人优势\n`;
      prompt += `4. 提供改进建议\n\n`;
    }

    prompt += `请以JSON格式返回结果：\n`;
    prompt += `{\n`;
    prompt += `  "optimizedResume": "优化后的完整简历内容",\n`;
    prompt += `  "suggestions": ["建议1", "建议2", "建议3"],\n`;
    prompt += `  "keywords": ["关键词1", "关键词2", "关键词3"]\n`;
    prompt += `}`;

    return prompt;
  }

  /**
   * 解析API响应
   */
  private parseResponse(data: { choices?: Array<{ message?: { content?: string } }> }): DeepSeekResponse {
    try {
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('API响应格式错误');
      }

      // 尝试解析JSON响应
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          optimizedResume: parsed.optimizedResume || content,
          suggestions: parsed.suggestions || [],
          keywords: parsed.keywords || [],
        };
      }

      // 如果不是JSON格式，返回原始内容
      return {
        optimizedResume: content,
        suggestions: ['请查看优化后的简历内容'],
        keywords: [],
      };
    } catch (error) {
      console.error('解析API响应失败:', error);
      return {
        optimizedResume: data.choices?.[0]?.message?.content || '优化失败',
        suggestions: ['解析响应时出现错误'],
        keywords: [],
      };
    }
  }

  /**
   * 检查API密钥是否有效
   */
  async validateApiKey(): Promise<boolean> {
    if (!this.apiKey) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default DeepSeekService;
