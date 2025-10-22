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
