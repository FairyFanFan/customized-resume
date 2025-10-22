import { NextRequest, NextResponse } from 'next/server';
import DeepSeekService from '@/lib/deepseek';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { personalInfo, targetJob, model } = body;

    // 验证输入
    if (!personalInfo || typeof personalInfo !== 'string') {
      return NextResponse.json(
        { error: '个人信息不能为空' },
        { status: 400 }
      );
    }

    // 创建DeepSeek服务实例
    const deepSeekService = new DeepSeekService();

    // 检查API密钥是否配置
    const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
    if (!apiKey || apiKey === 'your_deepseek_api_key_here' || apiKey === 'sk-your-deepseek-api-key-here') {
      return NextResponse.json(
        { 
          success: false,
          error: 'DeepSeek API密钥未配置',
          message: '请在项目根目录创建 .env.local 文件，并添加 NEXT_PUBLIC_DEEPSEEK_API_KEY=your_api_key',
          configGuide: {
            step1: '访问 https://platform.deepseek.com/ 获取API密钥',
            step2: '创建 .env.local 文件',
            step3: '添加 NEXT_PUBLIC_DEEPSEEK_API_KEY=your_api_key',
            step4: '重启开发服务器'
          }
        },
        { status: 400 }
      );
    }

    // 调用API优化简历
    const result = await deepSeekService.optimizeResume({
      personalInfo,
      targetJob,
      model,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('简历优化API错误:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '服务器内部错误',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'DeepSeek API 服务运行正常',
    endpoints: {
      'POST /api/optimize-resume': '优化简历内容',
    },
  });
}
