import { ResumeFormData } from './ResumeForm';

interface ResumePreviewProps {
  data: ResumeFormData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* 简历内容 */}
        <div className="p-8">
          {/* 个人信息头部 */}
          <div className="text-center mb-8 pb-6 border-b-2 border-blue-600">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.name}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-gray-600">
              <span>{personalInfo.email}</span>
              <span>•</span>
              <span>{personalInfo.phone}</span>
              {personalInfo.address && (
                <>
                  <span>•</span>
                  <span>{personalInfo.address}</span>
                </>
              )}
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} className="text-blue-600 hover:text-blue-800">
                  LinkedIn
                </a>
              )}
              {personalInfo.github && (
                <a href={personalInfo.github} className="text-blue-600 hover:text-blue-800">
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* 个人简介 */}
          {summary && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
                个人简介
              </h2>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </div>
          )}

          {/* 工作经历 */}
          {experience && experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
                工作经历
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-gray-600">
                        <p>{exp.startDate} - {exp.current ? '至今' : exp.endDate}</p>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mt-2 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 教育背景 */}
          {education && education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
                教育背景
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-blue-600 font-medium">{edu.school}</p>
                        {edu.major && <p className="text-gray-600">{edu.major}</p>}
                      </div>
                      {edu.graduationDate && (
                        <div className="text-right text-gray-600">
                          <p>{edu.graduationDate}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 技能 */}
          {skills && skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
                技能
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 项目经历 */}
          {projects && projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
                项目经历
              </h2>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        {project.url && (
                          <a
                            href={project.url}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            查看项目 →
                          </a>
                        )}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-gray-700 mt-2 leading-relaxed">{project.description}</p>
                    )}
                    {project.technologies && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">技术栈: </span>
                        <span className="text-sm text-gray-700">{project.technologies}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
