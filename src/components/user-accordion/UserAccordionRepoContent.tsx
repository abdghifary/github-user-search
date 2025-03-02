import { UserRepository } from '../../services/git-api-service';

import starIcon from '../../assets/icons/star.svg';

interface UserAccordionRepoContentProps {
  repoData: UserRepository;
}

export const UserAccordionRepoContent = ({
  repoData,
}: UserAccordionRepoContentProps) => {
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    window.open(repoData.html_url, '_blank');
  };

  return (
    <div
      onClick={handleOnClick}
      className="bg-gray-100 p-3 rounded cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900">{repoData.name}</h3>

        <div className="flex items-center text-gray-600">
          <span>{repoData.stargazers_count}</span>

          <img className="w-4 h-4 ml-1" src={starIcon} alt="star" />
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {repoData.description || 'This repository has no description'}
      </p>
    </div>
  );
};
